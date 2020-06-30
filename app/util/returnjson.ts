class ResultJSON {
  fail(errorCode, errorMsg?, id?) {
    return {
      error: {
        code: errorCode,
        message: errorMsg,
      },
      id,
    };
  }

  success(data?, id?) {
    return {
      data: data || null,
      id,
      code: 200,
      message: 'success',
    };
  }
}

export const resultJson = new ResultJSON();
