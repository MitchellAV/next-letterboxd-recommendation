import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../hooks/useWindowSize";

interface PropTypes {
  currentPage: number;
  maxPage: number;
  query: any;
  pathname: string;
  ahead: number;
}
const Pages = ({ currentPage, maxPage, query, pathname, ahead }: PropTypes) => {
  const pageList = [];
  const start = currentPage - ahead;
  const end = currentPage + ahead;
  for (let i = start; i <= end; i++) {
    if (i >= 1 && i <= end && i <= maxPage) {
      pageList.push(i);
    }
  }

  return (
    <>
      {pageList.map((page) => (
        <Link
          key={page}
          href={{
            pathname,
            query: { ...query, page },
          }}
        >
          <a className={currentPage === page ? "page current" : "page"}>
            {page}
          </a>
        </Link>
      ))}
    </>
  );
};

const Pagination = ({
  currentPage,
  maxPage,
}: {
  currentPage: number;
  maxPage: number;
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const query = router.query;

  const [width, height] = useWindowSize();
  const isMobile = width < 768 ? true : false;
  const ahead = isMobile ? 2 : 5;
  return (
    <>
      {maxPage > 1 && (
        <section className="pagination">
          {currentPage > ahead + 1 && (
            <Link
              href={{
                pathname,
                query: { ...query, page: 1 },
              }}
            >
              <a className="first">
                <i className="fa fa-chevron-left"></i>
                <i className="fa fa-chevron-left"></i>
              </a>
            </Link>
          )}
          {currentPage !== 1 && (
            <>
              <Link
                href={{
                  pathname,
                  query: { ...query, page: currentPage - 1 },
                }}
              >
                <a className="previous">
                  <i className="fa fa-chevron-left"></i>
                </a>
              </Link>
            </>
          )}

          <Pages
            currentPage={currentPage}
            maxPage={maxPage}
            pathname={pathname}
            query={query}
            ahead={ahead}
          />
          {currentPage !== maxPage && (
            <>
              <Link
                href={{
                  pathname,
                  query: {
                    ...query,
                    page: currentPage + 1,
                  },
                }}
              >
                <a className="next">
                  <i className="fa fa-chevron-right"></i>
                </a>
              </Link>
              {maxPage >= currentPage + ahead + 1 && (
                <Link
                  href={{
                    pathname,
                    query: { ...query, page: maxPage },
                  }}
                >
                  <a className="last">
                    <i className="fa fa-chevron-right"></i>
                    <i className="fa fa-chevron-right"></i>
                  </a>
                </Link>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
};
export default Pagination;
