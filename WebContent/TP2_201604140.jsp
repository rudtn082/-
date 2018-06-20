<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%
	request.setCharacterEncoding("UTF-8");
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<title>충남대학교 틀린그림찾기 - 랭킹확인</title>
<style>
body {
	font-size: 240%;
}
</style>
</head>
<body>
	<%
		String name = request.getParameter("name");
		String score = request.getParameter("score");
		String Line = ""; // 라인 읽기 임시변수
		String fileName = "ranking.txt"; //생성할 파일명
		List<String> arr_name = new ArrayList<String>();
		List<Integer> arr_score = new ArrayList<Integer>();

		String dir = application.getRealPath("/WEB-INF/");
		String filePath = dir + "/" + fileName;
		BufferedWriter bw = new BufferedWriter(new FileWriter(filePath, true));
		PrintWriter writer = null;
		try {
			writer = new PrintWriter(bw, true);
			writer.printf("%s%n", name);
			writer.printf("%s%n", score);
		} catch (Exception e) {
			out.println("파일 에러");
		} finally {
			try {
				writer.close();
			} catch (Exception e) {

			}
		}

		try {
			FileReader fr = new FileReader(filePath);
			BufferedReader br = new BufferedReader(fr);
			while ((Line = br.readLine()) != null) {
				arr_name.add(Line);
				Line = br.readLine();
				arr_score.add(Integer.parseInt(Line));
			}
			br.close();
		} catch (IOException ioe) {
			out.println("파일 에러");
		}

		String[] array_name = new String[arr_name.size()];
		int size = 0;
		for (String temp : arr_name) {
			array_name[size++] = temp;
		}

		int[] array_score = new int[arr_score.size()];
		int size2 = 0;
		for (int temp : arr_score) {
			array_score[size2++] = temp;
		}

		for (int i = 0; i < array_name.length; i++) {
			for (int j = i + 1; j < array_name.length; j++) {
				if (array_score[i] < array_score[j]) {
					int temp = array_score[i];
					String temp2 = array_name[i];
					array_score[i] = array_score[j];
					array_name[i] = array_name[j];
					array_score[j] = temp;
					array_name[j] = temp2;
				}
			}
		}
	%>

	<%
		for (int i = 0; i < array_name.length; i++) {
			out.println(i + 1);
	%>
	등 :
	<%
		out.println(array_name[i]);
	%>
	-
	<%
		out.println(array_score[i]);
	%>
	점
	<br>
	<%
		}
	%>
</body>
</html>
