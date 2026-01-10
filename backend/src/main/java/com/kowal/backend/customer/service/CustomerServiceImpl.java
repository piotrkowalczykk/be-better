package com.kowal.backend.customer.service;

import com.kowal.backend.customer.dto.request.AddRoutineRequest;
import com.kowal.backend.customer.dto.request.UpdateRoutineRequest;
import com.kowal.backend.customer.dto.response.RoutineResponse;
import com.kowal.backend.customer.mapper.RoutineMapper;
import com.kowal.backend.customer.model.Routine;
import com.kowal.backend.customer.repository.RoutineRepository;
import com.kowal.backend.exception.customer.NotRoutineOwnerException;
import com.kowal.backend.exception.customer.RoutineNotFoundException;
import com.kowal.backend.security.model.AuthUser;
import com.kowal.backend.security.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final AuthUserRepository authUserRepository;
    private final RoutineRepository routineRepository;
    private final RoutineMapper routineMapper;

    @Autowired
    public CustomerServiceImpl(AuthUserRepository authUserRepository, RoutineRepository routineRepository, RoutineMapper routineMapper) {
        this.authUserRepository = authUserRepository;
        this.routineRepository = routineRepository;
        this.routineMapper = routineMapper;
    }

    @Override
    public RoutineResponse addRoutine(AddRoutineRequest addRoutineRequest, String userEmail) {
        AuthUser authUser = findAuthUserByEmail(userEmail);

        Routine newRoutine = new Routine();
        newRoutine.setAuthUser(authUser);
        newRoutine.setName(addRoutineRequest.getName());
        newRoutine.setIcon(addRoutineRequest.getIcon());
        newRoutine.setColor(addRoutineRequest.getColor());
        newRoutine.setScope(addRoutineRequest.getScope());
        newRoutine.setUnits(addRoutineRequest.getUnits());
        newRoutine.setDashboardPriority(addRoutineRequest.getDashboardPriority());

        Set<Integer> frequency = routineMapper.mapStringFrequencyToIntegerSet(addRoutineRequest.getFrequency());

        newRoutine.setFrequency(frequency);

        routineRepository.save(newRoutine);
        return routineMapper.mapRoutineToRoutineResponse(newRoutine);
    }

    @Override
    public RoutineResponse getRoutineById(Long routineId, String userEmail) {
        AuthUser authUser = findAuthUserByEmail(userEmail);
        Routine routine = findRoutineAndVerifyOwner(routineId, authUser.getId());
        return routineMapper.mapRoutineToRoutineResponse(routine);
    }

    @Override
    public List<RoutineResponse> getAllRoutines(String userEmail) {
        AuthUser authUser = findAuthUserByEmail(userEmail);
        List<Routine> routines = routineRepository.findByAuthUserId(authUser.getId());

        return routines.stream()
                .map(routineMapper::mapRoutineToRoutineResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RoutineResponse updateRoutine(Long routineId, UpdateRoutineRequest updateRoutineRequest, String userEmail) {
        AuthUser authUser = findAuthUserByEmail(userEmail);
        Routine routineToUpdate = findRoutineAndVerifyOwner(routineId, authUser.getId());

        if (updateRoutineRequest.getName() != null) routineToUpdate.setName(updateRoutineRequest.getName());
        if (updateRoutineRequest.getIcon() != null) routineToUpdate.setIcon(updateRoutineRequest.getIcon());
        if (updateRoutineRequest.getColor() != null) routineToUpdate.setColor(updateRoutineRequest.getColor());
        if (updateRoutineRequest.getScope() != null) routineToUpdate.setScope(updateRoutineRequest.getScope());
        if (updateRoutineRequest.getUnits() != null) routineToUpdate.setUnits(updateRoutineRequest.getUnits());
        if (updateRoutineRequest.getDashboardPriority() != null) routineToUpdate.setDashboardPriority(updateRoutineRequest.getDashboardPriority());
        if (updateRoutineRequest.getFrequency() != null) routineToUpdate.setFrequency(routineMapper.mapStringFrequencyToIntegerSet(updateRoutineRequest.getFrequency()));

        routineRepository.save(routineToUpdate);
        return routineMapper.mapRoutineToRoutineResponse(routineToUpdate);
    }

    @Override
    public RoutineResponse deleteRoutine(Long routineId, String userEmail) {
        AuthUser authUser = findAuthUserByEmail(userEmail);
        Routine routineToDelete= findRoutineAndVerifyOwner(routineId, authUser.getId());
        routineRepository.deleteById(routineToDelete.getId());
        return routineMapper.mapRoutineToRoutineResponse(routineToDelete);
    }

    private AuthUser findAuthUserByEmail(String userEmail) {
        return authUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));
    }

    private Routine findRoutineAndVerifyOwner(Long routineId, Long authUserId) {
        Routine routine = routineRepository.findById(routineId)
                .orElseThrow(() -> new RoutineNotFoundException("Routine not found with ID: " + routineId));

        if (!routine.getAuthUser().getId().equals(authUserId)) {
            throw new NotRoutineOwnerException("User is not the owner of routine with ID: " + routineId);
        }
        return routine;
    }

}
