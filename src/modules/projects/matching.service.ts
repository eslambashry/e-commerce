// src/modules/projects/matching.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Vendor } from '../vendors/entities/vendor.entity';
import { Match } from '../vendors/entities/matches.entity';

@Injectable()
export class MatchingService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Vendor)
    private readonly vendorsRepository: Repository<Vendor>,
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  /**
   * يعيد بناء قائمة التوافقات لمشروع معين.
   * @param projectId - معرّف المشروع
   */
  async rebuildMatches(projectId: string): Promise<Match[]> {
    // 1. جلب تفاصيل المشروع
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found.`);
    }

    // 2. جلب كل الموردين الذين يغطون بلد المشروع
    const potentialVendors = await this.vendorsRepository.find({
      where: {
        countries_supported: In([project.country]), // In() للبحث داخل مصفوفة
      },
    });

    const createdMatches: Match[] = [];

    // 3. المرور على كل مورد محتمل لتطبيق القواعد وحساب الدرجة
    for (const vendor of potentialVendors) {
      // القاعدة 1: حساب عدد الخدمات المتداخلة
      const servicesOverlap = project.services_needed.filter((service) =>
        vendor.services_offered.includes(service),
      ).length;

      // القاعدة 2: التأكد من وجود تداخل واحد على الأقل
      if (servicesOverlap === 0) {
        continue; // انتقل إلى المورد التالي
      }

      // 4. حساب الدرجة (Score)
      // مثال بسيط لمعادلة SLA_weight. يمكنك تعديلها حسب الحاجة.
        const slaWeight = vendor.response_sla_hours > 0 ? 10 / vendor.response_sla_hours : 0;
  const score =
    parseFloat(String(servicesOverlap * 2)) +
    parseFloat(String(vendor.rating)) +
    parseFloat(String(slaWeight));

      // 5. منطق الـ Upsert (تحديث أو إضافة) لضمان عدم التكرار
      const existingMatch = await this.matchesRepository.findOne({
        where: { project_id: projectId, vendor_id: vendor.id },
      });

      if (existingMatch) {
        // إذا كان التوافق موجوداً، قم بتحديث الدرجة فقط
        existingMatch.score = score;
        const updatedMatch = await this.matchesRepository.save(existingMatch);
        createdMatches.push(updatedMatch);
      } else {
        // إذا لم يكن موجوداً، أنشئ توافقاً جديداً
        const newMatch = this.matchesRepository.create({
          project_id: projectId,
          vendor_id: vendor.id,
          score: score,
        });
        const savedMatch = await this.matchesRepository.save(newMatch);
        createdMatches.push(savedMatch);
      }
    }

    return createdMatches;
  }
}
