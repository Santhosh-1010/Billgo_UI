import Swal from "sweetalert2";
export const IP = process.env.REACT_APP_IP
export const apis = {
    ENDPOINT_FULL_QA : '/answer',
    DOCUMENT_UPLOAD : '/ingest',
    URL_UPLOAD : '/ingest_url',
    GRAPHS_DATA :'/metrics',
    FLUSH_DB : '/release_memory',
    CONTAINER_RESTART : '/restart-container',
    NEO4J_STATUS : '/neo4j_status',
    RELOAD_API : '/reload-docs',
    ingetion :'/process_multibranch_repo',
    INGESTED_LIST :'/get_repos',
    retriveRepoData :'/explain',
    GET_CODE : '/get_code',
    LOGIN : 'auth/login',
    REGISTER : 'auth/register',
    USERS_LIST :'/users',
    PENDING_LIST :'/pending-registrations',
    APPROVE_USER :'/approve-user',
    DELETE_USER:'/delete-user',
    REJECT_USER:'/reject-user',
    EDIT_USER_ROLE:'/users',
    RESET_PASSWORD:'/reset-password',
     USER_DETAILS :'auth/users/me',
    CHATING_HISTORY:'/process-query',
    SESSION_ID:'/new-session-id',
    UPLOAD_DOCUMENT:'/ingest-data',
    UPLOAD_LINK_DOCUMENT:'/ingest-url',
    PARTITION_LIST :'/partitions/role/',
    PARTITION_META:'/metadata',
    USER_CHAT_SESSION:'/user-sessions',
}
    export const URL ={
        Api : `${IP}`,
        ApiInject :`${IP}kbmsapi`, //Upload Documnet and upload URL
        ApiAnswer:`${IP}kbmsapi`,
 
 
        GitIngestion: `${IP}gitkbapi`,  //Ingestion repo
        DeployedURL:`${IP}ragapi/`,  // Login and Genie metrics
        // DeployedURL:' http://34.46.36.105:1000/ragapi/',
        GIT_GRAPH_DATA: `${IP}ragapi/`, //git metrics
        TEST_AI_METRICS :`${IP}test_ai`,
 
        API_BASE_AI :`${IP}:7000`,
        TEST_AI :`${IP}test_ai`, //Test Ai
       
 
        ADMIN_USERS :`${IP}ragapi/admin`, //admin

        BILGO_INGESTION :`${IP}`
    }
    export const showSuccessAlert = (title = 'Success', text = 'Operation completed successfully!') => {
        return Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };
   
    export const showErrorAlert = (title = 'Error', text = 'Something went wrong.') => {
        return Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    };
   
    export const showConfirmAlert = (
        title = 'Are you sure?',
        text = 'Do you want to proceed?',
        confirmButtonText = 'Yes',
        cancelButtonText = 'Cancel'
    ) => {
        return Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            reverseButtons: true,
        });
    };
    export const TextDisplay = ({ text }) => {
        const parseText = (text) => {          
            const regex = /(?:\*\*(.+?)\*\*|(\d+\.\s+|[-*]\s+)?(.+?)):/g;
        
            return text?.split('\n').map((line, index) => {
                const textWithoutAsterisks = line.replace(/\*\*(.+?)\*\*/g, (_, innerText) => {
                    return innerText; 
                });
        
                const formattedLine = textWithoutAsterisks.replace(regex, (match, p1, p2, p3) => {
                    const textToBold = p1 || p3;
                    return `<strong>${textToBold}</strong>:`;
                });
        
                return (
                    <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                );
            });
        };
        
    
        return (
          <div>
            <ul>{parseText(text)}</ul>
          </div>
        );
      };