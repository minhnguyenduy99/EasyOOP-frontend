export class ResponseFormatter {
  getErrorFormat(responseOrError) {
    return {
      error: responseOrError.data ||
        responseOrError || {
          error_type: "Global.RequestError",
          error: "API REQUEST ERRROR"
        }
    };
  }

  getDataFormat(response) {
    return {
      data: response?.data
    };
  }
}
