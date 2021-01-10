export class ApiResponseAdaptor {
    static adapt<T>(promise: Promise<any>): Promise<T> {
        return new Promise<T>(((resolve, reject) => {
            promise.then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
            }, error => {
                if (error.response) {
                    reject(error.response.data)
                } else {
                    reject(error)
                }
            })
        }));
    }
}
