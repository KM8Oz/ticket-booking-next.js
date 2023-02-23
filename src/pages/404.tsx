import Link from 'next/link'

const NotFound = () => {

  return (
    <div className="not-found">
      <h1>Упс...</h1>
      <h2>Эта страница не может быть найдена:(</h2>
      <p>Вернитесь к <Link href="/"><a>Домашняя страница</a></Link></p>
    </div>
  );
}
 
export default NotFound;