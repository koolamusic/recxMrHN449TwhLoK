import MainLayout from '../layouts/main'
import useSWR from 'swr'



export default function Example() {
  const { data, error } = useSWR('/api', fetch)

  // console.log(data.json())
  // const result = data.json()

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <MainLayout>hello {JSON.stringify(data.json())}!</MainLayout>
}