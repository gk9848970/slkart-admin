
/**********************Imports******************/

/**********************Components*****************/
function PaginationComponent({pageLimit, currPage, setCurrPage, itemsCount})
{
	const pagesCount = Math.ceil(itemsCount / pageLimit);

	const getPagesToBeDisplayed = () => {
		const pages = [];
		for(let i = 1; i <= pagesCount; ++i)
		{
			pages.push((<li className="page-item" onClick={() => setCurrPage(i)}><a className="page-link" href="#">{i}</a></li>));
		}

		return pages;
	};

	return (
		<nav aria-label="...">
			<ul className="pagination pagination-sm add_bottom_30">
				<li className={currPage === 1 ? "page-item disabled" : "page-item"} onClick={() => {if(currPage !== 1) setCurrPage(currPage-1)}}>
					<a className="page-link" href="#" tabindex="-1">Previous</a>
				</li>
					{getPagesToBeDisplayed()}
				<li className={currPage === pagesCount ? "page-item disabled" : "page-item"} onClick={() => {if(currPage !== pagesCount) setCurrPage(currPage+1)}}>
					<a className="page-link" href="#">Next</a>
				</li>
			</ul>
		</nav>
	)
}

/**********************Functions******************/

function filterItemsBySearchKeyword(items, keyword, propertyName, pageDetails)
{
	/*Returns the filtered items by keyword and the items to be displayed for pagination */
	
	const lowerCaseKeyword = keyword.toLowerCase();
	
	const filteredItems = keyword.length ? items.filter((item) => {
		if(item[propertyName].toLowerCase().includes(lowerCaseKeyword))
			return item;
	}) : items;

	const itemsToDisplay = filteredItems.filter((item, index) => {
		if(index >= (pageDetails.pageNumber-1)*pageDetails.pageLimit && index < pageDetails.pageNumber*pageDetails.pageLimit)
			return item;
	})

	return [filteredItems, itemsToDisplay];
}

/**********************Exports******************/
export default PaginationComponent;
export {filterItemsBySearchKeyword};
