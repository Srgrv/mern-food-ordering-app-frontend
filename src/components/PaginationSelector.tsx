import React from "react";

// components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// types
type TProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector: React.FC<TProps> = ({
  page,
  pages,
  onPageChange,
}) => {
  // Создается массив pageNumbers, содержащий номера всех страниц от 1 до pages.
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    //  Основной элемент Pagination оборачивает всю пагинацию.
    <Pagination>
      {/*PaginationContent оборачивает все элементы пагинации. */}
      <PaginationContent>
        {/*Если текущая страница не первая (page !== 1), отображается элемент PaginationPrevious, который позволяет перейти на предыдущую страницу, вызывая onPageChange с номером предыдущей страницы. */}
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
        {pageNumbers.map((number, index) => (
          // Для каждого номера страницы создается элемент PaginationItem, который содержит PaginationLink. Если номер страницы совпадает с текущей страницей (page === number), ссылка помечается как активная с помощью пропса isActive.
          <PaginationItem key={`${number}${index}`}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/*Если текущая страница не последняя (page !== pageNumbers.length), отображается элемент PaginationNext, который позволяет перейти на следующую страницу, вызывая onPageChange с номером следующей страницы. */}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
