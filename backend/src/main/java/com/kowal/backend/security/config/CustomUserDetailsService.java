package com.kowal.backend.security.config;

import com.kowal.backend.security.model.AuthUser;
import com.kowal.backend.security.model.Role;
import com.kowal.backend.security.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private AuthUserRepository authUserRepository;

    @Autowired
    public CustomUserDetailsService(AuthUserRepository authUserRepository){
        this.authUserRepository = authUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser user = authUserRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));
        return new User(user.getEmail(), user.getPassword(), mapRolesToGrantedAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToGrantedAuthorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
