export const sweetalert = {
    SUCCESS_TITLE: 'SUCCESS',
    SUCCESS_ICON: 'success',
    OK_CONFIRMED_TEXT: 'OK',
    ERROR_TITLE: 'Error',
    ERROR_ICON: 'error',
    ERROR_CONFIRMED_TEXT: 'Error',
    LOGOUT_CONFIRM_TEXT: 'Are you sure you want to logout?',
    WARNING_TITLE:'Warning',
    WARNING_ICON:'warning',
    CONFIRM_BUTTON_TEXT:'Yes, Logout',
    CANCEL_BUTTON_TEXT:'Cancel'
}
export const XAXISKEYS = {
    SEVERITY: 'severity',
    ASSISTANCE: 'assistant_name',
    REVIEW: 'review_name',
    APPLICATION: 'Application',
    MONTH: 'month',
    REPO_NAME :'repo_name',
    WEEK : 'week',
}
export const XAXISNAMES = {
    AVARAGE_QUALITY: 'Average quality',
    AVARAGE_SEVERITY: 'Average severity',
    COUNT: 'Count',
    PERCENTAGE: 'Percentage',
   SECRETS_COUNT: 'Secrets Count',
   DISABLE_FILES_COUNT : 'Disallowed Files Count'
}
export const DATAKEY = {
    COUNT: 'count',
    PERCENTAGE: 'percentage',
    AVARAGE_QUALITY: 'average_quality',
    AVARAGE_SEVERITY: 'average_severity',
    SECRETS_COUNT : 'secrets_count',
    DISABLE_FILES_COUNT:"disallowed_files_count",
    PROJECT:'project'
}
export const TITLE = {
    AVARAGE_CODE_QUALITY: 'Average Code Quality',
    AVARAGE_CODE_SEVERITY: 'Average Code Severity',
    COMMIT_ISSUES_SEVERITY:"Commit Issue Severity Distribution By User",
    COMMIT_VIOLATE :"Commit Violation Metrics"
}
export const CANVASKEY = {
    ASSISTANCE : 'Assistant',
    REVIEW : 'Review',
    SEVERITY: 'severity',

}

export const  baseURL =  'https://neoai.bilvantis.com/'

export const homePage3TextSamples = {
    LINE_GRAPH_DATA : [1, 7, 8, 9, 5, 3, 4, 10, 11, 5, 6, 7],
    LINE_GRAPH_X_AXIS_DATA : ['Jan','Feb', 'Mar', 'Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
    BAR_GRAPH_DATA : [10, 15, 7, 4, 6, 8, 7],
    BAR_GRAPH_X_AXIS_DATA : ['Node Js','React Js','Angular','Java','Spring Boot','CDE','Data',],
    PIE_CHART_DATA : [{ label: 'Project Manager', value: 400 },{ label: 'User', value: 300 },],
    DOCUMENT_NAME : 'Document Name',
    DOCUMENT_SIZE : 'Document Size in MB',
    INGESTION_TIME : 'Ingestion time',
    NO_OF_PAGES : 'No of Pages',
    NO_OF_IMAGE_DOCS : 'No of Image Docs',
    NO_OF_TABLE_DOCS : 'No of Table Docs',
    NO_OF_TEXT_DOCS : 'No of Text Docs',
    TOTAL_INGESTION_TOKENS : 'Total Ingestion Tokens in K',
    QUESTIONS_TABLE_DATA_HEADERS : ["document_name","Tech","Pages context","Pages relv","No of Chroma Tokens in K","No ES Tokens in K","No of Neo4j Tokens in K","Total tokens in K"]
}

export const headerTextSamples = {
    SOLAR_WINDS : 'Welcome  to Genie'
}

export const footerTextSamples = {
    BILVANTIS : '@Bilvantis 2024'
}

export const adminDashboardTextSamples = {
    FLUSH_DB : 'flushDB',
    CONATAINER_RESTART : 'App Restart',
    RELOAD : 'Reload',
    NEO_FOURJ : 'Neo4j Status',
    APP_RESATRT_MSG : 'App restart sucessful',
    FLUSH_ERROR : 'An error occurred while flushing.',
    RESTART_ERROR : 'An Error occured while restarting',
    RELOAD_ERROR : 'An error occurred while Reloading.',
    CHANDE_STATUS_ERROR : 'An error occurred while changing status.',
    API_ERROR : 'API call failed:',
    STORAGE_LOCATION : 'Storage Location',
}


export const API_BASE_AI = 'http://34.134.148.250:7000';

// Static user credentials for demo purposes
export const STATIC_USERS = [
    {
        id: 1,
        username: 'admin@sample.com',
        password: 'admin123',
        full_name: 'Admin User',
        role: 'admin',
        access_token: 'static_admin_token_12345'
    },
    {
        id: 2,
        username: 'user@sample.com',
        password: 'user123',
        full_name: 'Demo User',
        role: 'user',
        access_token: 'static_user_token_67890'
    },
    {
        id: 3,
        username: 'test@sample.com',
        password: 'test123',
        full_name: 'Test User',
        role: 'user',
        access_token: 'static_test_token_11111'
    }
];

export const STATIC_AUTH_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    LOGIN_SUCCESS: 'Login successful',
    AUTHENTICATION_REQUIRED: 'Authentication required'
};

// Static data for GitMetrics
export const STATIC_GIT_METRICS = {
    document_metrics: [
        {
            document_name: "React Guide.pdf",
            tech: "React",
            pages_context: 45,
            pages_relv: 42,
            no_of_chroma_tokens_in_k: 125.5,
            no_es_tokens_in_k: 89.2,
            no_of_neo4j_tokens_in_k: 67.8,
            total_tokens_in_k: 282.5
        },
        {
            document_name: "API Documentation.docx",
            tech: "API",
            pages_context: 78,
            pages_relv: 75,
            no_of_chroma_tokens_in_k: 198.3,
            no_es_tokens_in_k: 145.6,
            no_of_neo4j_tokens_in_k: 112.4,
            total_tokens_in_k: 456.3
        },
        {
            document_name: "Database Schema.sql",
            tech: "Database",
            pages_context: 23,
            pages_relv: 20,
            no_of_chroma_tokens_in_k: 67.8,
            no_es_tokens_in_k: 45.2,
            no_of_neo4j_tokens_in_k: 34.1,
            total_tokens_in_k: 147.1
        },
        {
            document_name: "Frontend Architecture.md",
            tech: "Frontend",
            pages_context: 56,
            pages_relv: 52,
            no_of_chroma_tokens_in_k: 156.7,
            no_es_tokens_in_k: 112.3,
            no_of_neo4j_tokens_in_k: 89.5,
            total_tokens_in_k: 358.5
        },
        {
            document_name: "Backend Services.pdf",
            tech: "Backend",
            pages_context: 89,
            pages_relv: 85,
            no_of_chroma_tokens_in_k: 234.6,
            no_es_tokens_in_k: 178.9,
            no_of_neo4j_tokens_in_k: 134.2,
            total_tokens_in_k: 547.7
        }
    ],
    user_metrics: [
        {
            user_name: "John Doe",
            total_queries: 156,
            successful_queries: 142,
            failed_queries: 14,
            avg_response_time: "2.3s",
            last_activity: "2024-01-15 14:30"
        },
        {
            user_name: "Jane Smith",
            total_queries: 234,
            successful_queries: 221,
            failed_queries: 13,
            avg_response_time: "1.8s",
            last_activity: "2024-01-15 13:45"
        },
        {
            user_name: "Mike Johnson",
            total_queries: 89,
            successful_queries: 82,
            failed_queries: 7,
            avg_response_time: "3.1s",
            last_activity: "2024-01-15 12:20"
        },
        {
            user_name: "Sarah Wilson",
            total_queries: 312,
            successful_queries: 298,
            failed_queries: 14,
            avg_response_time: "2.1s",
            last_activity: "2024-01-15 15:10"
        },
        {
            user_name: "David Brown",
            total_queries: 178,
            successful_queries: 165,
            failed_queries: 13,
            avg_response_time: "2.7s",
            last_activity: "2024-01-15 11:55"
        }
    ]
};

// Static data for Admin Dashboard
export const STATIC_ADMIN_USERS = [
    {
        id: 1,
        full_name: "John Doe",
        email: "john.doe@bilvantis.com",
        role: "admin",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-10",
        last_login: "2024-01-15 14:30",
        status: "active"
    },
    {
        id: 2,
        full_name: "Jane Smith",
        email: "jane.smith@bilvantis.com",
        role: "user",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-12",
        last_login: "2024-01-15 13:45",
        status: "active"
    },
    {
        id: 3,
        full_name: "Mike Johnson",
        email: "mike.johnson@bilvantis.com",
        role: "manager",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-08",
        last_login: "2024-01-15 12:20",
        status: "active"
    },
    {
        id: 4,
        full_name: "Sarah Wilson",
        email: "sarah.wilson@bilvantis.com",
        role: "employee",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-14",
        last_login: "2024-01-15 15:10",
        status: "active"
    },
    {
        id: 5,
        full_name: "David Brown",
        email: "david.brown@bilvantis.com",
        role: "user",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-11",
        last_login: "2024-01-15 11:55",
        status: "active"
    }
];

export const STATIC_PENDING_USERS = [
    {
        id: 6,
        full_name: "Alex Taylor",
        email: "alex.taylor@bilvantis.com",
        role: "user",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-15",
        status: "pending"
    },
    {
        id: 7,
        full_name: "Lisa Garcia",
        email: "lisa.garcia@bilvantis.com",
        role: "employee",
        company_name: "Bilvantis Technologies",
        created_at: "2024-01-15",
        status: "pending"
    }
];

// Static data for Chat
export const STATIC_CHAT_SESSIONS = [
    {
        session_id: "session_001",
        earliest_query: "How to implement authentication?",
        created_at: "2024-01-15T10:30:00Z",
        last_activity: "2024-01-15T14:30:00Z"
    },
    {
        session_id: "session_002",
        earliest_query: "Best practices for React components",
        created_at: "2024-01-15T09:15:00Z",
        last_activity: "2024-01-15T13:45:00Z"
    },
    {
        session_id: "session_003",
        earliest_query: "Database optimization techniques",
        created_at: "2024-01-15T08:45:00Z",
        last_activity: "2024-01-15T12:20:00Z"
    },
    {
        session_id: "session_004",
        earliest_query: "API design patterns",
        created_at: "2024-01-14T16:20:00Z",
        last_activity: "2024-01-15T15:10:00Z"
    },
    {
        session_id: "session_005",
        earliest_query: "Frontend performance optimization",
        created_at: "2024-01-14T14:10:00Z",
        last_activity: "2024-01-15T11:55:00Z"
    }
];

export const STATIC_PARTITION_DATA = [
    {
        Partition: "department",
        Partition_value: ["Engineering", "Marketing", "Sales", "HR"]
    },
    {
        Partition: "project",
        Partition_value: ["Project Alpha", "Project Beta", "Project Gamma"]
    },
    {
        Partition: "priority",
        Partition_value: ["High", "Medium", "Low"]
    }
];

export const STATIC_CHAT_RESPONSES = {
    "How to implement authentication?": "Authentication can be implemented using JWT tokens, OAuth, or session-based authentication. Here's a basic JWT implementation approach:\n\n1. **Token Generation**: Create JWT tokens upon successful login\n2. **Token Storage**: Store tokens securely (httpOnly cookies or secure storage)\n3. **Token Validation**: Verify tokens on protected routes\n4. **Refresh Mechanism**: Implement token refresh for long-lived sessions\n\nWould you like me to provide specific code examples for any of these steps?",
    
    "Best practices for React components": "Here are the key best practices for React components:\n\n**Component Design:**\n- Use functional components with hooks\n- Keep components small and focused\n- Follow single responsibility principle\n- Use TypeScript for better type safety\n\n**Performance:**\n- Use React.memo for expensive components\n- Implement useCallback and useMemo appropriately\n- Avoid inline object/function creation in render\n- Use code splitting for large applications\n\n**State Management:**\n- Use local state for component-specific data\n- Use Context API for shared state\n- Consider Redux for complex state management\n\n**Styling:**\n- Use CSS modules or styled-components\n- Follow consistent naming conventions\n- Implement responsive design\n\nWould you like me to elaborate on any of these areas?",
    
    "Database optimization techniques": "Here are effective database optimization techniques:\n\n**Query Optimization:**\n- Use appropriate indexes on frequently queried columns\n- Write efficient SQL queries with proper WHERE clauses\n- Avoid SELECT * and fetch only needed columns\n- Use EXPLAIN to analyze query execution plans\n\n**Schema Design:**\n- Normalize tables appropriately (but not over-normalize)\n- Use appropriate data types and sizes\n- Consider denormalization for read-heavy workloads\n- Implement proper foreign key constraints\n\n**Performance Tuning:**\n- Configure database memory settings\n- Use connection pooling\n- Implement caching strategies (Redis, Memcached)\n- Regular maintenance and statistics updates\n\n**Monitoring:**\n- Set up query performance monitoring\n- Track slow queries and optimize them\n- Monitor database resource usage\n- Implement proper logging and alerting\n\nWhich specific database system are you working with?",
    
    "API design patterns": "Here are essential API design patterns:\n\n**RESTful Design:**\n- Use HTTP methods appropriately (GET, POST, PUT, DELETE)\n- Design intuitive resource URLs (/users, /users/123)\n- Use proper HTTP status codes\n- Implement consistent response formats\n\n**Versioning:**\n- Use URL versioning (/api/v1/users)\n- Implement backward compatibility\n- Deprecate old versions gracefully\n\n**Error Handling:**\n- Return meaningful error messages\n- Use consistent error response format\n- Implement proper HTTP status codes\n- Log errors for debugging\n\n**Security:**\n- Implement authentication and authorization\n- Use HTTPS for all communications\n- Validate and sanitize inputs\n- Implement rate limiting\n\n**Documentation:**\n- Use OpenAPI/Swagger specifications\n- Provide clear examples\n- Document authentication methods\n- Include error response examples\n\nWould you like me to show examples for any specific pattern?",
    
    "Frontend performance optimization": "Here are key frontend performance optimization techniques:\n\n**Loading Performance:**\n- Implement code splitting and lazy loading\n- Optimize images (WebP, compression, lazy loading)\n- Use CDN for static assets\n- Minimize and compress JavaScript/CSS\n\n**Runtime Performance:**\n- Use React.memo, useMemo, and useCallback\n- Implement virtual scrolling for large lists\n- Optimize re-renders with proper state management\n- Use Web Workers for heavy computations\n\n**Bundle Optimization:**\n- Tree shake unused code\n- Use dynamic imports for code splitting\n- Optimize webpack/bundler configurations\n- Implement proper caching strategies\n\n**Network Optimization:**\n- Implement service workers for offline functionality\n- Use HTTP/2 and compression\n- Minimize API calls and implement caching\n- Use preloading for critical resources\n\n**Monitoring:**\n- Use performance monitoring tools\n- Implement Core Web Vitals tracking\n- Profile JavaScript performance\n- Monitor bundle size and loading times\n\nWhich area would you like to focus on for your specific use case?"
};