export const loadState = () => {
    try {
        const state = (localStorage.getItem('state'));
        const serializedSate =  JSON.parse(state);
        if (serializedSate === null) {
            return undefined;
        }
        return serializedSate;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

export const saveState = (name, state) => {
    try {
        const serializedSate = JSON.stringify(state);
        localStorage.setItem( name, serializedSate)
    } catch (err) {
        console.log(err);
    }
}
