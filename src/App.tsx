import React, { useState } from 'react';
import Jobpost from './Jobpost'; // Jobpostコンポーネントをインポート

interface Job {
  title: string;
  category: string;
  salary: string;
}

const initialJobs: Job[] = [
  { title: "経験者歓迎！大手企業でのWebエンジニア募集", category: "エンジニア", salary: "600万円" },
  { title: "未経験OK！営業アシスタント急募", category: "営業", salary: "350万円" },
  { title: "グローバル企業でのマーケティングマネージャー", category: "マーケティング", salary: "800万円" },
  { title: "UI/UXデザイナー募集！急成長中のスタートアップ", category: "デザイン", salary: "550万円" },
  { title: "大手製造業での生産管理スペシャリスト", category: "製造", salary: "650万円" },
  { title: "急成長ベンチャーでの経理マネージャー募集", category: "財務・経理", salary: "700万円"},
  { title: "大手IT企業での人事担当者募集", category: "人事", salary: "500万円"},
  { title: "外資系企業でのカスタマーサポート担当募集", category: "カスタマーサポート", salary: "400万円"},
  { title: "看護師募集！大学病院での勤務", category: "医療・介護", salary: "550万円"},
  { title: "一般事務スタッフ募集！週3日からOK", category: "事務", salary: "300万円"},
];

const ITEMS_PER_PAGE = 5; // 1ページあたりの表示件数

const App: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string>("all");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [currentPage, setCurrentPage] = useState<"search" | "post">("search");
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1); // 現在のページ番号

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  const handlePostJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
    setCurrentPage("search");
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesSalary = selectedSalary === "all" || parseInt(job.salary) >= parseInt(selectedSalary);
    return matchesCategory && matchesSalary;
  });

  // ページごとの表示データを計算
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPageNumber - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">求人検索アプリ</h1>
        <nav className="space-x-4">
          <button 
            onClick={() => setCurrentPage("search")} 
            className={`text-white hover:text-gray-300 ${currentPage === "search" ? "underline" : ""}`}>
            求人検索
          </button>
          <button 
            onClick={() => setCurrentPage("post")} 
            className={`text-white hover:text-gray-300 ${currentPage === "post" ? "underline" : ""}`}>
            求人投稿
          </button>
        </nav>
      </header>

      {currentPage === "search" && (
        <div className="flex">
          <aside className="w-1/4 bg-gray-100 p-4">
            <h3 className="font-bold mb-2">求人カテゴリ</h3>
            {["事務", "エンジニア", "営業", "デザイン", "マーケティング", "財務・経理", "人事", "カスタマーサポート", "製造", "医療・介護"].map(category => (
              <label key={category} className="block mb-2">
                <input
                  type="checkbox"
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
            <h3 className="font-bold mb-2 mt-4">年収</h3>
            <select
              value={selectedSalary}
              onChange={e => setSelectedSalary(e.target.value)}
              className="w-full p-2 border"
            >
              <option value="all">全て</option>
              <option value="300万">300万円以上</option>
              <option value="500万">500万円以上</option>
              <option value="700万">700万円以上</option>
            </select>
          </aside>

          <main className="w-3/4 p-4">
            <h2 className="text-xl font-bold mb-4">求人一覧</h2>
            <p className="mb-4">該当件数: {totalItems}件</p> {/* 該当件数を表示 */}
            <div>
              {paginatedJobs.map((job, index) => (
                <div key={index} className="bg-white p-4 mb-4 shadow">
                  <h4 className="font-bold">{job.title}</h4>
                  <p>カテゴリ: {job.category}</p>
                  <p>年収: {job.salary}</p>
                </div>
              ))}
            </div>

            {/* ページネーション */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border ${currentPageNumber === index + 1 ? "bg-blue-500 text-white" : "bg-white"} hover:bg-gray-100 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </main>
        </div>
      )}

      {currentPage === "post" && <Jobpost onPostJob={handlePostJob} />} {/* 求人投稿ページを表示 */}
    </div>
  );
};

export default App;
