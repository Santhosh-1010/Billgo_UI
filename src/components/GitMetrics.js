import React, { useEffect, useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchGitGraphList } from "../actions/gitGraphDataActions";
import "./GitMetrics.css";
import QuestionsTable from "./QuestionsTable";

export default function GitMetrics() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let [documentMetrics, setDocumentMetrics] = useState([]);
  const [userMetrics, setUserMetrics] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchPaginatedData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        let response = await dispatch(fetchGitGraphList({ page, page_size: 10 }));
        setLoading(false);
        if (!response?.payload) {
          console.error("Error: Invalid response structure", response);
          return { data: [], totalPages: 1 };
        }
        const { document_metrics, user_metrics, pagination } = response.payload;
        setDocumentMetrics(document_metrics || []);
        setUserMetrics(user_metrics || []);
        setTotalPages(pagination?.total_pages || 1);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching paginated data:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPaginatedData(currentPage);
  }, [fetchPaginatedData, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <Container fluid className="w-100">
      <div className="w-100 h-100 mb-5 pb-4">
        <div className="d-flex flex-column h-100 ms-2" style={{ overflowY: "auto" }}>
          <h3>Document Metrics</h3>
          {documentMetrics && documentMetrics.length > 0 ? (
            <>
            <div className="scrollable-container">
              <QuestionsTable graphsData={documentMetrics} />
            </div>
            <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
</>
          ) : (
            <div className="text-center m-5">No data found</div>
          )}

          <h3 className="mt-3">User Metrics</h3>
          {userMetrics && userMetrics.length > 0 ? (
            <>
            <div className="scrollable-container" >
              <QuestionsTable graphsData={userMetrics} />
            </div>
            
          </>
          ) : (
            <div className="text-center m-5">No data found</div>
          )}

          
        </div>
      </div>
    </Container>
  );
}