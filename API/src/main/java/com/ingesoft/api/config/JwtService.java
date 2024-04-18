package com.ingesoft.api.config;

import com.ingesoft.api.usuario.Usuario;
import com.ingesoft.api.usuario.UsuarioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =  "5c458cafcdd57201dc86b82612c889c5f8a54e29e664a7a6f5553e7582c614a62c9ba4f9bdbfc81798bdaa749acc4164393992ca4780e2ce5d8d7d851917e873bcdd7b7bc1c6b1ead21d38605a378263255bedfdfcd6ca4b15c8167e1342fa16e23a881d582be0c8b10bab4c02f717420abeeb0e9f6358b0c71dc38e714b0325d72ea9d293dbc888d36de5f11f8523f4fdf1e49371d11ac9a2dae731c22aafbd14644002aebc9dff79490b0a421e7fd5567756e1e13f3ac7b2158a98d96cfeed81b992f9b6d227bd24ab2b0d7aab702208e156327cf20d06f15edfce49f14a6149e21f18fddb1ec97ab0aa05017cd500536db597c5667dbf799220b1d3b213";
    private final UsuarioRepository usuarioRepository;

    public JwtService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public String extractUserName(String token){
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Usuario getUser(String token){
        String dni = extractUserName(token);

        Usuario usuario = usuarioRepository.findByDni(dni)
                .orElseThrow();

        return usuario;
    }

}
