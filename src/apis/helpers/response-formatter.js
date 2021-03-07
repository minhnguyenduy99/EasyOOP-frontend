export class ResponseFormatter {
  getErrorFormat(responseOrError) {
    return {
      error: responseOrError?.data ?? responseOrError ?? "API REQUEST ERRROR"
    };
  }

  getDataFormat(response) {
    return {
      data: response?.data
    };
  }
}
