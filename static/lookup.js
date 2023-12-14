class E extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      const form = event.currentTarget.closest('form');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          form.latitude.value = pos.coords.latitude;
          form.longitude.value = pos.coords.longitude;
          form.submit();
        },
        (err) => {
          window.alert(`${err.code} ${err.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  }
}

customElements.define('x-submit-location', E);
