package fun.jons.motorvognregister;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
public class MotorvognHandler {

//    public ArrayList<Motorvogn> motorvognsRegister = new ArrayList<>();
    public HashMap<String, Motorvogn> motorvognHashMap = new HashMap<>();

    @PostMapping("/registerVehicle")
    public void registerVehicle(String pnummer, String navn, String adresse, String kjennetegn, String bilmerke, String biltype) {
        Motorvogn motorvogn = new Motorvogn(pnummer, navn, adresse, kjennetegn, bilmerke, biltype);

        motorvognHashMap.put(kjennetegn, motorvogn);

//        motorvognsRegister.add(motorvogn);
    }

    @GetMapping("/motorvognsRegister")
    public ArrayList<Motorvogn> getMotorvognsRegister() {

        ArrayList<Motorvogn> register = new ArrayList<>(motorvognHashMap.values());

        return register;
    }

    @PostMapping("/slett")
    public void slettVehicle(String plate) {

        // Tar seg av slettingen av alle bilene.
        if (plate.equals("*")) {
//            motorvognsRegister.clear();
            motorvognHashMap.clear();
            return;
        }

        motorvognHashMap.remove(plate);
    }
}
