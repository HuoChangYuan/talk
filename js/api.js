var API = (function() {
    const URL = 'https://study.duyiedu.com';
    const token_key = 'token';

    function get(path) {
        const headers = {};
        // 看看本地localStorage里有没有token值
        const token = localStorage.getItem(token_key);
        // 如果有值就加进去
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(URL + path, { headers })
    }

    function post(path, bodyObj) {
        const headers = {
            'content-type': 'application/json',
        };
        // 看看本地localStorage里有没有token值
        const token = localStorage.getItem(token_key);
        // 如果有值就加进去
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(URL + path, { headers, method: 'POST', body: JSON.stringify(bodyObj) })
    }



    // 注册
    async function reg(userInfo) {
        // const resp = await fetch(URL + '/api/user/reg', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userInfo),
        // })
        // return await resp.json();
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
    };
    // reg({"loginId":"hcy","nickname":"霍","loginPwd":"123"}).then(resp=>console.log(resp));
    // 登陆
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
            // 将响应头中的token保存起来
            const token = resp.headers.get('authorization');
            localStorage.setItem(token_key, token);
        }
        return result;
    };

    // 验证帐号
    async function exists(loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    };

    // 当前登录的用户信息
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    };

    // 发送聊天消息
    async function sendChat(content) {
        const resp = await post('/api/chat', {
            content
        })
        return await resp.json();
    };

    // 获取聊天记录
    async function getHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();

    };

    // 退出登录/注销
    function loginOut() {
        localStorage.removeItem(token_key);
    }

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
    };
})();