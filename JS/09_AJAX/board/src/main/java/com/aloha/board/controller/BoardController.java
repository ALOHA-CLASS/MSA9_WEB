package com.aloha.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.board.dto.Board;
import com.aloha.board.service.BoardService;

import lombok.extern.slf4j.Slf4j;





/**
 *  /board 경로로 요청 왔을 때 처리
 *  [GET]   - /board/list   : 게시글 목록 화면
 *  [GET]   - /board/read   : 게시글 조회 화면
 *  [GET]   - /board/insert : 게시글 등록 화면
 *  [POST]  - /board/insert : 게시글 등록 처리
 *  [GET]   - /board/update : 게시글 수정 화면
 *  [POST]  - /board/update : 게시글 수정 처리
 *  [POST]  - /board/delete : 게시글 삭제 처리
 */
@CrossOrigin(origins = "*") // CORS 정책 해제
@Slf4j                      // 로그 어노테이션
@RestController                 // 컨트롤러 스프링 빈으로 등록
@RequestMapping("/board")   // 클레스 레벨 요청 경로 매핑 
                            // - /board/~ 경로의 요청은 이 컨트롤러에서 처리
public class BoardController {
    
    // ⭐데이터 요청과 화면 출력
    // Controller --> Service (데이터 요청)
    // Controller <-- Service (데이터 전달)
    // Controller --> Model   (모델 등록)
    // View <-- Model         (데이터 출력)
    @Autowired                              // 의존성 자동 주입
    private BoardService boardService;      // @Service를 --Impl 에 등록

    /**
     * 게시글 목록 조회 화면
     * @return
     * @throws Exception 
     */
    @GetMapping("")
    public List<Board> list(Model model
                    ) throws Exception {
        // 데이터 요청
        // List<Board> boardList = boardService.list(page);         //[페이징]
        // List<Board> boardList = boardService.search(keyword);    //[검색]
        // List<Board> boardList = boardService.search(option);     //[검색]
        List<Board> boardList = boardService.list();    //[페이징]+[검색]


        // 모델 등록
        // model.addAttribute("boardList", boardList);

        // 뷰 페이지 지정
        return boardList;       // resources/templates/board/list.html
    }
    
    /**
     * 게시글 조회 화면
     * - /board/read?no=💎
     * @param no
     * @return
     * @throws Exception 
     */
    // @RequestParam("파라미터명") 
    // - 스프링 부트 3.2버전 이하, 생략해도 자동 매핑된다.
    // - 스프링 부트 3.2버전 이상, 필수로 명시해야 매핑된다.
    @GetMapping("/{no}")
    public Board read(@PathVariable("no") int no
                      , Model model
                      ) throws Exception {
        // 데이터 요청
        Board board = boardService.select(no);

        // 모델 등록
        // model.addAttribute("board", board);
        
        // 뷰페이지 지정
        return board;
    }
    
    /**
     * 게시글 등록 화면
     * @return
     */
    @GetMapping("/insert")
    public String insert() {

        return "/board/insert";
    }

    /**
     * 게시글 등록 처리
     * @param board
     * @return
     * @throws Exception 
     */
    @PostMapping("")
    public String insertPro(@RequestBody Board board) throws Exception {

        log.info(board.toString());

        // 데이터 요청
        int result = boardService.insert(board);
        // 리다이렉트
        // ⭕ 데이터 처리 성공
        if( result > 0 ) {
            return "SUCCESS";
        }
        // ❌ 데이터 처리 실패
        return "FAIL";  
    }
    

    /**
     * 게시글 수정 처리
     * @param board
     * @return
     * @throws Exception
     */
    @PutMapping("")
    public String updatePro(@RequestBody Board board) throws Exception {
        int result = boardService.update(board);

        // ⭕ 데이터 처리 성공
        if( result > 0 ) {
            return "SUCCESS";
        }
        // ❌ 데이터 처리 실패
        return "FAIL";  
    }
    
    /**
     * 게시글 삭제 처리
     * @param no
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{no}")
    public String delete(@PathVariable("no") int no) throws Exception {
        int result = boardService.delete(no);
        return result > 0 ? "SUCCESS" : "FAIL";
    }
    
    
}
