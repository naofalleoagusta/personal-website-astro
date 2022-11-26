const scrollToView = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export default scrollToView;
