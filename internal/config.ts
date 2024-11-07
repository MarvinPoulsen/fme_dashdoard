const justamapMinimapIdParam = '[module.just_a_map.minimapid]';
const justamapMinimapIdDev = '42ecaa51-e35c-417b-b5c6-e5fec7d521dd';
export const justamapMinimapId = justamapMinimapIdParam.includes('[') ? justamapMinimapIdDev : justamapMinimapIdParam;