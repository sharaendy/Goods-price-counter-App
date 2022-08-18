import 'whatwg-fetch';

export default async () => {
  const response = await fetch('/products.json');
  return response.json();
};
