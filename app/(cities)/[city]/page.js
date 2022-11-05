async function getData(city) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  console.log(cityName);
  try {
    // To refetch data on every fetch() request, use the cache: 'no-store' option.
    const res = await fetch(
      `http://localhost:8000/api/v1/cities/public?name=${cityName}`,
      { next: { revalidate: 10 } }
    );
    // console.log("hello");
    // console.log(res.json());
    return res.json();
  } catch (err) {
    console.log(err);
  }
}
export default async function Page({ params, searchParams }) {
  // /blog/hello-world => { params: { slug: 'hello-world' } }
  // /blog/hello-world?id=123 => { searchParams: { id: '123' } }
  const data = await getData(params.city);
  // console.log(data);
  const content = data?.data?.data?.content;

  return (
    <>
      <p>{content}</p>
    </>
  );
}
