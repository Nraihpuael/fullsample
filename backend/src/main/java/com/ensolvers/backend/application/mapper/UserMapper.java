package com.ensolvers.backend.application.mapper;

import com.ensolvers.backend.application.dto.UserRequestDTO;
import com.ensolvers.backend.application.dto.UserDTO;
import com.ensolvers.backend.domain.entity.User;

public class UserMapper {

    public static User toEntity(UserRequestDTO userRequestDTO) {
        if (userRequestDTO == null) {
            return null;
        }
        User user = new User();
        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        return user;
    }

    public static UserDTO toUserInfoDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }
}
