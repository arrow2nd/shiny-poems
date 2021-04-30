const Search = () => (
  <div className="px-4 py-8 text-center">
    <p className="text-2xl">
      <i className="ol-search-o mr-3" />
      SEARCH
    </p>

    <div className="flex flex-wrap justify-center mt-4">
      <select className="w-48 h-8 m-1 rounded-md border border-gray-200">
        <option value="test">アイドル名から</option>
      </select>
      <select className="w-48 h-8 m-1 rounded-md border border-gray-200">
        <option value="test">衣装名から</option>
      </select>
    </div>
  </div>
)

export default Search
