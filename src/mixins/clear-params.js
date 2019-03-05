export default {
    methods: {
        clearParams(obj) {
            for (let key in obj) {
                obj[key] = null;
            }
        }
    }
}