let config = {
  /*  API_URL:'http://150.95.80.78:9090',
     API_URL_IMG:'http://150.95.27.52:4001/static/',
   
   API_TTT: '20EC2A2BA3ED2470C11AC4E78461189769DEEAFBDC0D209709897902E6042D44',
  
   configpathfile: 'http://150.95.27.52:9090',
   DTC_HOST:"http://devweb.dtcgps.com:8087",
 DTC_TOKEN:"18FGEREW9PF7P2CVZ5HNSKZ31BB6R8VQ94U3AC2WTX4USHGMTK65LYQLADJN7JXD", */
  API_URL: 'http://150.95.80.78:9090',
  API_URL_IMG: 'http://150.95.80.78:9090/static/',
  API_TTT: '20EC2A2BA3ED2470C11AC4E78461189769DEEAFBDC0D209709897902E6042D44',
  configpathfile: 'http://150.95.80.78:65131',
  DTC_HOST: "http://devweb.dtcgps.com:8087",
  DTC_TOKEN: "18FGEREW9PF7P2CVZ5HNSKZ31BB6R8VQ94U3AC2WTX4USHGMTK65LYQLADJN7JXD",
  API_URL_rawmatInOutCTS: 'http://150.95.80.78:4000',
  API_URL_externalData: 'http://150.95.80.78:4000',
  API_URL_reportPDF: 'http://150.95.80.78:4000',
  API_URL_snManagement: 'http://150.95.80.78:4000',
  API_URL_planningCTS: 'http://150.95.80.78:4000',
  API_URL_hrMagenatement: 'http://150.95.89.38:5007',
  API_URL_incentive: 'http://150.95.80.78:65131',
  API_URL_IMG_incentive: 'http://150.95.80.78:65131/static/',
  // API_URL_incentive: 'http://localhost:9998',
  API_URL_getEmployeeList: 'http://150.95.89.38:5007/api/hrManagement/getuserlist',

};

export default Object.freeze(Object.assign({}, config));
