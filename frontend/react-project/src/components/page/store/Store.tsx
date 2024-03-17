import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { store } from '../../../apis/apis';
import { StoreDetail } from '../../../types/types';


export const Store: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [storeData, setStoreData] = useState<StoreDetail[]>([]);
    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await store(id);
                const data = response.data;
                // 以降の処理...
                // // const data = await response.json();
                // setResults(data)
                setStoreData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStoreData();
    }, [id]);

    return (
        <div className="maincontainer">
            <div className="storebox">
                <div className="storesummary">
                    <ul className="searchresultul">
                        {/* データの表示 */}
                        {storeData && storeData.map((item) => (
                            <React.Fragment key={item.id}>
                                <li className="searchresultli">
                                    <div className='searchresultliimg'>
                                        <img src={item.photos}></img>
                                    </div>
                                    <h3><p>{item.name}</p></h3>
                                    <h4><p>{item.namekana}</p></h4>
                                    <p>{item.address}</p>
                                    <p>{item.phone_number}</p>
                                    <button type="button">投稿</button>
                                </li>
                            </React.Fragment>
                        ))}

                    </ul>
                </div>
                <div className="postedphoto">{/* データの表示 */}

                </div>
                <br />
                <h5 className='storereviewh4'>■レビュー</h5>
                <div className="storereview"></div>
                <br />
                <h5 className='storedetailh4'>■店舗情報</h5>
                <div className="storedetail"></div>
            </div>
        </div >
    );
};