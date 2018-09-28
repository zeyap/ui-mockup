/* *
  Application Constants
 */
const constants = {
  get_apps_url : 'json/apps.json',
  get_standards_url : 'json/standards.json',
  get_certifications_url : 'json/certifications.json',
  get_components_url : 'json/components.json',
  get_projects_url: 'json/projects.json',
  get_users_url: 'json/users.json',
  standards_url: {
    "NIST 800-53":"opencontrols/standards/nist-800-53-latest.json",
    "tsc-2017":"opencontrols/standards/tsc-2017.json",
    "pci-dss":"opencontrols/standards/pci-dss.json"
  }
};

export default constants;
