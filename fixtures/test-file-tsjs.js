// @snippet:start start-file
// @snippet:start start-fn
export const basicTestFile = (args) => {
    // @snippet:end start-file
    // @snippet:start with-comment check it out!
    let myStr = args.isHello ? 'hello' : 'goodbye';
    // @snippet:start start-iife
    (() => {
        myStr = 'world';
        // @snippet:end
    })();
    // @snippet:start end
    return myStr;
};
