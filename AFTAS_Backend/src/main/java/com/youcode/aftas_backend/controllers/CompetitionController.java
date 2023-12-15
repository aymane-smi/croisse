package com.youcode.aftas_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.services.CompetitionService;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@AllArgsConstructor

@RestController
@Validated
@RequestMapping(path = "api/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionController extends Controller<CompetitionDto, String> {

    private final CompetitionService competitionService;

    @GetMapping("/all")
    public ResponseEntity<List<CompetitionDto>> getAllCompetitions(@RequestParam(defaultValue = "0") final Integer page, @RequestParam(defaultValue = "10") final Integer size) {
        return new ResponseEntity<>(competitionService.getAllCompetitions(page, size), HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<List<CompetitionDto>> getCurrentCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getOnGoingCompetition(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @GetMapping("/future")
    public ResponseEntity<List<CompetitionDto>> getFutureCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getFutureCompetitions(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @GetMapping("/closed")
    public ResponseEntity<List<CompetitionDto>> getClosedCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getClosedCompetitions(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @GetMapping("/size")
    public ResponseEntity<Map<String, Integer>> getCompetitionsNumber(){
        Map<String, Integer> message = new HashMap<>();
        message.put("number", competitionService.getCompetitionsNumber());
        return new ResponseEntity<>(
                message,
                HttpStatus.OK
                );
    }
    @GetMapping("/size/after")
    public ResponseEntity<Map<String, Integer>> getAfterCompetitionsNumber(){
        Map<String, Integer> message = new HashMap<>();
        message.put("number", competitionService.getAfterCompetitionsNumber());
        return new ResponseEntity<>(
                message,
                HttpStatus.OK
        );
    }
    @GetMapping("/size/before")
    public ResponseEntity<Map<String, Integer>> getBeforeCompetitionsNumber(){
        Map<String, Integer> message = new HashMap<>();
        message.put("number", competitionService.getBeforeCompetitionsNumber());
        return new ResponseEntity<>(
                message,
                HttpStatus.OK
        );
    }

    @GetMapping("/size/going")
    public ResponseEntity<Map<String, Integer>> getGoingCompetitionsNumber(){
        Map<String, Integer> message = new HashMap<>();
        message.put("number", competitionService.getGoingCompetitionsNumber());
        return new ResponseEntity<>(
                message,
                HttpStatus.OK
        );
    }
}
