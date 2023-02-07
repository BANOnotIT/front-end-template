# Fuji frontend assignment

Comments:
1. Right now I can't implement Optimistic UX for meows sending because none of this provided:
   - ethers.js resolves when transaction was committed but not saved by chain
   - Contract doesn't provide any event on send
   - No idempotency key is used in contract
2. It [doesn't look](https://front-end-template-gamma.vercel.app/) as cool as [original assignment](http://messages-status-assignment.surge.sh/) since I'm not good at color picking.
3. For folders I used [Feature Sliced Design](https://feature-sliced.design/) pattern
4. I used only one Service class with internal cache since DDD here is overkill, but it'll be more idiomatic to use Presenter class that implement caching and dedicated Service class to listen to contract events (that are not present right now)
5. For commit messages I used [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 
