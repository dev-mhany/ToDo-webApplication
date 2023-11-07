export default function trackException(
  tag: string,
  err: Error | string,
  stack: string
) {
  if (!window.location.href.includes("localhost")) {
    //Here we can add some logic to track exceptions
    console.log("exception " + tag);
    console.log(err);
    console.log(stack);
  } else {
    console.log("exception " + tag);
    console.log(err);
    console.log(stack);
  }
}
