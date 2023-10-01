function createResult(error, data) {
  return error ? createError(error) : createSuccess(data)
}

function createSuccess(data) {
  const result = {}
  result['status'] = 'success'
  result['data'] = data

  return result
}

function createError(error) {
  const result = {}
  result['status'] = 'error'
  result['error'] = error

  // return result
  return error
  //changed from
  //return result
}

module.exports = {
  createResult: createResult,
  createError: createError,
  createSuccess: createSuccess,
}