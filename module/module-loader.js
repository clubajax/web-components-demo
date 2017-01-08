window.module = {
    set exports (item) {
        console.log('exported:', item);
        window[item.id] = item;
    }
};

window.require = function (id) {
    console.log('require id:', id);
    //alert('require');
    id += '.js';
    document.write('<script src="'+id+'"></script>');
    console.log('script written');
};