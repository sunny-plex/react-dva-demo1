/* api list */

let API_HOST = 'https://www.yunlianapi.com'
if (process.env.NODE_ENV === 'development') {
  API_HOST = 'http://192.168.1.120:8848'
  // API_HOST = 'http://112.65.128.102:8848'
  // API_HOST = 'https://www.yunlianapi.com'
}

export default {
  OSS_POLICY_IMG: API_HOST + '/api/admin/images', // GET: keywords(String)

  USER_LOGIN: API_HOST + '/api/admin/login', // POST

  PRODUCT_LIST: API_HOST + '/api/admin/index', // GET

  OPERATOR_LIST: API_HOST + '/api/admin/product/operators', // GET: productId(Int)
  OPERATOR_REMOVE: API_HOST + '/api/admin/operator/remove', // POST: productId(Int), operatorId[productId(Int)]
  OPERATOR_SEARCH: API_HOST + '/api/admin/operator/search', // GET: keywords(String)
  OPERATOR_JOIN: API_HOST + '/api/admin/product/operator/relate', // POST: productId(String), operatorId(String)
  OPERATOR_ADD: API_HOST + '/api/admin/operator/add', // POST: name(String), phone(String), IDCardNumber(String), AvatarURL(String), area(String), IDCardImage(URL String)

  BATCH_CREATE_MASTER: API_HOST + '/api/admin/batch/create-master', // POST: productId(String), startDate(Int * 10)
  BATCH_LIST: API_HOST + '/api/admin/batch/list', // GET: productId(Int)
  BATCH_CHILD_DETAIL: API_HOST + '/api/admin/batch/child-detail', // GET: batchId(Int)
  BATCH_CHILD_ATTR: API_HOST + '/api/admin/batch/child-attr', // GET: batchId(Int)
  BATCH_PRE_SET: API_HOST + '/api/admin/batch/pre-set', // GET: batchId(Int)  POST: batchId(Int), preBatchId(Int)
  BATCH_END: API_HOST + '/api/admin/batch/end', // POST: batchId(int)
  BATCH_MATERIAL_SEARCH: API_HOST + '/api/admin/batch/pre-search', // GET: trackType(String), year(String), keywords(String)

  NETWORK_TEST: '/'
}
