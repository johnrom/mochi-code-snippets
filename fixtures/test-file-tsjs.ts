// @snippet:start start-file

// comments above interfaces disappear during compilation
interface BasicTestFileArgs {
  isHello: true;
}
// @snippet:start start-fn
export const basicTestFile = (args: BasicTestFileArgs) => {
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
