import React, { useState } from 'react';

interface Job {
  title: string;
  category: string;
  salary: string;
}

interface JobPostProps {
  onPostJob: (job: Job) => void;
}

const JobPost: React.FC<JobPostProps> = ({ onPostJob }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && category && salary) {
      onPostJob({ title, category, salary });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">求人投稿</h2>
      <label className="block mb-2">求人カテゴリ選択</label>
      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border mb-4">
        <option value="">カテゴリを選択</option>
        <option value="エンジニア">エンジニア</option>
        <option value="営業">営業</option>
        <option value="マーケティング">マーケティング</option>
        <option value="デザイン">デザイン</option>
        <option value="製造">製造</option>
        <option value="財務・経理">財務・経理</option>
        <option value="人事">人事</option>
        <option value="カスタマーサポート">カスタマーサポート</option>
        <option value="医療・介護">医療・介護</option>
        <option value="事務">事務</option>
      </select>
      <label className="block mb-2">年収 (万円)</label>
      <input
        type="text"
        value={salary}
        onChange={e => setSalary(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <label className="block mb-2">求人タイトル</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">投稿</button>
    </form>
  );
};

export default JobPost;
