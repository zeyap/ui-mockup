/* *
  Application Constants
 */
const remote_resources = {
  suffix:'http://',
  ip:'18.188.151.28',
  port:'1377'
}
const remote_address = remote_resources.suffix+remote_resources.ip+':'+remote_resources.port;

const constants = {
  get_apps_url : '/json/apps.json',
  get_standards_url : '/json/standards.json',
  get_certifications_url : '/json/certifications.json',
  get_components_url : '/json/components.json',
  get_projects_url: '/json/projects.json',
  get_users_url: '/json/users.json',
  standards_url: {
    "NIST 800-53": remote_address+"/standard/get_standard/NIST-800-53",
    "tsc-2017": remote_address+"/standard/get_standard/TSC"
  },
  loginUrl: '/user/login',
  createUserUrl:'/user/',
  getUserCompliance:'/standard/getCertificationForUser/',
  remote_address
};

export default constants;
