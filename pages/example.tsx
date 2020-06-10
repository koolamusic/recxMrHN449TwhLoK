import MainLayout from '../layouts/main'
import useSWR from 'swr'
import { GetServerSideProps } from 'next'
import ResourceFactory from '../utils/api'


const baseURL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU&location=5.6364025,-0.1670703&radius=10000&type=hospital';
export const defaultConfig = {
  baseURL: baseURL,
  headers: {
    'X-Request-With': 'XMLHttpRequest'
  }
};




ResourceFactory.updateDefaults(defaultConfig)

class Api extends ResourceFactory.createResource('api') { }



export default function Example() {
  const { data, error } = useSWR('/api', fetch)


  console.log(Api.list({
    sort_by: JSON.stringify({
      asc_desc: 'asc',
      order_by: 'date_created'
    }),
    limit: JSON.stringify('20')
  }).then((res) => console.log(res.data)).catch((err) => console.log(err)))

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <MainLayout>hello {JSON.stringify(data)}!</MainLayout>
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const dump = await executeRequest('http://localhost:3000/api')
//   console.log(dump)

//   return {
//     props: {
//       dump
//     }
//   }

// }