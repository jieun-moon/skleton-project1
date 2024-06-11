<!-- <script>
import userList from './assets/users.json';
export default {
    name: 'UserList',
    computed: {
        users() {
            // #1
            return userList.users.map((items) => {
                // #2
                // #3
                let c = new Date(items['created_date']);
                let created_date = c.getHours() + '시 ' + c.getMinutes() + '분';

                items['created_date'] = created_date;

                return items;
            });
        },
    },
};
</script>

<template>
    <div>
        <h1>사용자</h1>

        <ul v-for="user in users" :key="user.id">
            <li>이름: {{ user.name }}</li>
            <li>전화번호: {{ user.phone }}</li>
            <li>등록 시간: {{ user.created_date }}</li>
            <br />
        </ul>
    </div>
</template> -->
