// import * as winston from 'winston';
// import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

// export const winstonConfig = {
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.timestamp(), 
//         nestWinstonModuleUtilities.format.nestLike('🍤', {
//           prettyPrint: true,
//         }),
//       ),
//     }),
//     // Remove or conditionally add file transport only in non-serverless environment
//     ...(process.env.VERCEL ? [] : [
//       new winston.transports.File({
//         filename: 'logs/app.log',
//         level: 'info',
//         format: winston.format.combine(
//           winston.format.timestamp(),
//           winston.format.json(),
//         ),
//       })
//     ])
//   ],
// };