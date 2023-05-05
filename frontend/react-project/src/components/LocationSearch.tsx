import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prefecture } from '../types/types';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// / テストデータ
const testprefectures: Prefecture[] = [
  { id: 1, name: "北海道" },
  { id: 2, name: "青森県" },
  { id: 3, name: "岩手県" },
  { id: 4, name: "宮城県" },
  { id: 5, name: "秋田県" },
  { id: 6, name: "山形県" },
  { id: 7, name: "福島県" },
  { id: 8, name: "茨城県" },
  { id: 9, name: "栃木県" },
  { id: 10, name: "群馬県" },
  { id: 11, name: "埼玉県" },
  { id: 12, name: "千葉県" },
  { id: 13, name: "東京都" },
  { id: 14, name: "神奈川県" },
  { id: 15, name: "新潟県" },
  { id: 16, name: "富山県" },
  { id: 17, name: "石川県" },
  { id: 18, name: "福井県" },
  { id: 19, name: "山梨県" },
  { id: 20, name: "長野県" },
  { id: 21, name: "岐阜県" },
  { id: 22, name: "静岡県" },
  { id: 23, name: "愛知県" },
  { id: 24, name: "三重県" },
  { id: 25, name: "滋賀県" },
  { id: 26, name: "京都府" },
  { id: 27, name: "大阪府" },
  { id: 28, name: "兵庫県" },
  { id: 29, name: "奈良県" },
  { id: 30, name: "和歌山県" },
  { id: 31, name: "鳥取県" },
  { id: 32, name: "島根県" },
  { id: 33, name: "岡山県" },
];

function LocationSearch() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const setPrefecturesWithTestPrefectures = () => {
    setPrefectures(testprefectures);
  };

  useEffect(() => {
    instance.get('/db/prefectures')
      .then(response => {
        setPrefectures(response.data);
      })
      .catch(error => {
        setPrefecturesWithTestPrefectures();
      });
  }, []);

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (selectedPrefectures.includes(value)) {
      setSelectedPrefectures(selectedPrefectures.filter(prefecture => prefecture !== value));
    } else {
      setSelectedPrefectures(selectedPrefectures.filter(prefecture => prefecture !== value));
    }
  };
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedPrefectures([event.target.value]);
  }


  return (
    <div>
      <label>都道府県:</label>
      <select value={selectedPrefectures} onChange={handleSelectChange}>
        <option value="">都道府県を選択してください</option>
        {prefectures.map(prefecture => (
          <div key={prefecture.id}>
            <label>
              <input type="checkbox" value={prefecture.name} checked={selectedPrefectures.includes(prefecture.name)} onChange={handleCheckboxChange} />
              {prefecture.name}
            </label>
          </div>
        ))}
      </select>

    </div>
  );
}

export default LocationSearch;
