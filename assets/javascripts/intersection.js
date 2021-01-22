const look = () => {
  let items = document.querySelectorAll(".film");

  let observer = new IntersectionObserver(
    function (observables) {
      observables.forEach(function (observable) {
        if (observable.intersectionRatio > 0.5) {
          observable.target.classList.remove("not-visible");
          console.log(observable);
        }
      });
    },
    {
      threshold: [0.5],
    }
  );
  
  items.forEach(function (item) {
    observer.observe(item);
  });
};

