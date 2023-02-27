export default(module) => {
    import('example').then((Example) => {
        console.log(Example);
    });
};
