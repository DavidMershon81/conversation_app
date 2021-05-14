import { useState, useEffect } from 'react'

const useFetchData = (getUrl, addUrl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getData = () => {
        setLoading(true);
        fetch(getUrl)
        .then(res => res.json())
        .then(resData => {
          setData(resData);
          setLoading(false);
        });
      };

      getData();
    },[getUrl]);


    const addData = (newData) => {
      setLoading(true);
      fetch(addUrl, {
        method: 'POST',
        headers: { 
          'Content-type' : 'application/json' 
        },
        body: JSON.stringify(newData)
      }).then(res => { 
        return res.json(); 
      }).then(newData => {
        console.log(newData);
        setData([...data, newData]);
        setLoading(false);
      });
    };

    return [ data, addData, loading ];
}

export default useFetchData
