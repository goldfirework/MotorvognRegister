package fun.jons.motorvognregister;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;

@RestController
public class MotorvognHandler {

    public ArrayList<Motorvogn> motorvognsRegister = new ArrayList<>();

    @PostMapping("/registerVehicle")
    public void registerVehicle(String pnummer, String navn, String adresse, String kjennetegn, String bilmerke, String biltype) {
        Motorvogn motorvogn = new Motorvogn(pnummer, navn, adresse, kjennetegn, bilmerke, biltype);

        motorvognsRegister.add(motorvogn);
    }

    @GetMapping("/motorvognsRegister")
    public ArrayList<Motorvogn> getMotorvognsRegister() {
        return  motorvognsRegister;
    }
}
