// 로컬 스토리지에 JSON 형태로 저장 / 불러오기 / 삭제 헬퍼
export default (function() {
    const st = localStorage || { }
    return {
        set: (key, object) => {
            st[key] = (typeof object) === 'string' ? object : JSON.stringify(object)
        },
        get: (key) => {
            if(!st[key]) {
                return null
            }
            const value = st[key]

            try {
                const parsed = JSON.parse(value)
                return parsed
            } catch(e) {
                return value
            }
        },
        remove: (key) => {
            if(localStorage) {
                return localStorage.removeItem(key)
            }
            delete st[key]
        }
    }
})()