// @snippet:start start-file
interface BasicTestFileArgs {
  isHello: true;
}
// @snippet:start start-fn
export const basicTestFile = (args: BasicTestFileArgs) => {
  // @snippet:end start-file
  let myStr = args.isHello ? 'hello' : 'goodbye';

  // @snippet:start start-iife
  (() => {
    myStr = 'world';
    // @snippet:end
  })();
  // @snippet:start end

  return myStr;
};
