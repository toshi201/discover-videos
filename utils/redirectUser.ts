import { veriyToken } from "../lib/utils";
import { GetServerSidePropsContext } from "next";

const useRedirectUser = (context: GetServerSidePropsContext) => {
  const token = context.req ? context.req.cookies.token : ""; //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDIyNTkwRDhjOEZiODU0N2VBN0NCNjBkYjE4Y0Q1MzFDREM2NjMzZTkiLCJwdWJsaWNBZGRyZXNzIjoiMHgyMjU5MEQ4YzhGYjg1NDdlQTdDQjYwZGIxOGNENTMxQ0RDNjYzM2U5IiwiZW1haWwiOiJhcXVhY29ubmVyOEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjUxODE0MzQxLCJleHAiOjE2NTI0MTkxNDEsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDIyNTkwRDhjOEZiODU0N2VBN0NCNjBkYjE4Y0Q1MzFDREM2NjMzZTkifX0.mMDGjBQEbuIY8JtiVqZOhtteNu-S_XWRdDgduCdekuc';
  const userId = veriyToken(token);

  return {
    userId,
    token
  }
  //console.log({ token });
};

export default useRedirectUser;
